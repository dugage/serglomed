<?php
namespace Repositories;
use Doctrine\ORM\EntityRepository;
/**
 * Class RegistrosRepositorio
 * @package Repositories
 */
class RegistrosRepositorio extends EntityRepository
{
  /**
   * @var string
   */
 	private $entity = "Entities\\Registros";
  /**
   * @return array
   */
  public function getRegistros($start,$max,$f,$q,$usuario = false)
	{
		//almacena el los parametros de búsqueda montanto un where
		$where = "";
		//si f que es el tipo de busqueda y q que es el dato a buscar son distintos de null entramos
		if($f AND $q)
		{
			if($f == 'document_number')
			{
			  	$where = "AND u.".$f." = ".$q;
			}else{
			    $where = "AND u.".$f." LIKE '%".$q."%'";
			}
		}
	  	$query = $this->_em->createQuery("SELECT u FROM $this->entity u WHERE u.softDelete = 0 $where ORDER BY u.id DESC")
	    ->setFirstResult($start)
	    ->setMaxResults($max);
	  	return $query->getResult();
	}
	public function getRegistrosByUser($start,$max,$f,$q,$usuario = false)
	{
		//almacena el los parametros de búsqueda montanto un where
		$where = "";
		//si f que es el tipo de busqueda y q que es el dato a buscar son distintos de null entramos
		if($f AND $q)
		{
			if($f == 'document_number')
			{
			  	$where = "AND u.".$f." = ".$q;
			}else{
			    $where = "AND u.".$f." LIKE '%".$q."%'";
			}
		}
  	/*$query = $this->_em->createQuery("SELECT u FROM $this->entity u WHERE u.idusuario = $usuario AND u.oculto = 0 AND u.softDelete = 0 $where ORDER BY u.prima DESC, u.renovation ASC")
    ->setFirstResult($start)
    ->setMaxResults($max);
  	*/
    
    //$hoy = date();
    // Último código comentado
    /*$query = $this->_em->createQuery("SELECT u FROM $this->entity u WHERE u.idusuario = $usuario AND u.oculto = 0 AND u.softDelete = 0 $where ORDER BY u.fregistro DESC, u.prima DESC, u.renovation ASC")
      ->setFirstResult($start)
      ->setMaxResults($max);
	*/
	  $query = $this->_em->createQuery("SELECT u, (CASE WHEN u.fregistro = CURRENT_DATE() THEN 1 ELSE 0 END) as hidden priority FROM $this->entity u WHERE u.idusuario = $usuario AND u.oculto = 0 AND u.softDelete = 0 $where ORDER BY priority DESC, u.prima DESC, u.renovation ASC")
      ->setFirstResult($start)
      ->setMaxResults($max);
      return $query->getResult();
	}
	public function getNextRecord($usuario,$id = 0)
	{   
		/*
		Consutamos primero comprobando entre otros parametros la hora para la que esta programáda
		la llamada es menor o igual, es decir si esta dentro de la hora a la que al cliente se le
		propuesto la llamada, si no es así, y el resultadoi es null, consultaremos si tenemos para
		este día programadas llamadas sin estado, es decir nuevas.
		*/
		//almacenamos AND AND u.id != $id sólo en caso de que id > 0, para que este no se repita
		$andId = "";
		if($id > 0)
		{
			$andId = "AND u.id != ".$id;
		}
		//almacenamos la hora actual en la que realizamos la consulta
		$hour = date('G.i');
		//desde ahora la consulta se realiza sobre $codeactivity
		$codeactivity = date('Ymd');
		/*
		13/01/2019
		-----------
		Para mejorar la experienca a la hora del salto de llamadas, vamos a realizarlo 
		de la siguiente forma.
		1.Realizamos una consuta sobre idestado = 2, que son los volver a llamar, donde este tendrá
		que tener un valor igual o mayor a la hora actual y una fecha igual a la actual
		,ordenaremos de forma ASC.
		2. Si la consulta no retorna resultado, entonces realizamos una consutla donde idestado != 2 
		manteniendo el order by u.tregistro ASC, u.idestado ASC
		3. Si la segunda opción tampoco retorna resultado, realizamos una última sobre idestado = 4 que es 
		igual a sin estado.
		*/
		$query = $this->_em->createQuery("SELECT u FROM $this->entity u WHERE u.idusuario = $usuario $andId 
		AND u.codeactivity = $codeactivity AND u.oculto = 0 AND u.softDelete = 0 AND u.idestado = 2 AND u.tregistro <= $hour
		ORDER BY u.tregistro ASC")
		->setMaxResults(1);
		if( $query->getOneOrNullResult() == null ){
			$query = $this->_em->createQuery("SELECT u FROM $this->entity u WHERE u.idusuario = $usuario $andId 
			AND u.codeactivity = $codeactivity AND u.oculto = 0 AND u.softDelete = 0 AND u.idestado != 2
			ORDER BY u.tregistro ASC, u.idestado ASC")
			->setMaxResults(1);
		}
		if($query->getOneOrNullResult() == null)
		{
			$query = $this->_em->createQuery("SELECT u FROM $this->entity u WHERE u.idusuario = $usuario $andId 
			AND u.oculto = 0 AND u.softDelete = 0 AND u.idestado = 4 ORDER BY u.prima DESC")
		  	->setMaxResults(1);
		}
		return $query->getOneOrNullResult();
	}
  public function softDelete($idUsuario)
  {
    //UPDATE `serglomed`.`registros` SET `soft_delete` = '1' WHERE `registros`.`idUsuario` = 5;
    $this->_em->createQuery("UPDATE $this->entity u SET u.softDelete = 1 WHERE u.idusuario = $idUsuario");
  }
}