<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login  extends MX_Controller
{
    private $nameClass = "";
    private $proyecto = null;

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('MY_encrypt_helper');
    	$this->load->model('Login_model');
        $this->proyecto = $this->doctrine->em->find("Entities\\Proyecto", 1);
        $this->nameClass = get_class($this);
	}

	public function index()
	{
        // pasamos los datos básicos del template
        $data['lang'] = "es";
        $data['title'] = $this->proyecto->getNombre()." | Panel de control";
        $data['view'] = strtolower(__FUNCTION__."_".$this->nameClass);
        $data['robots'] = 'noindex, nofollow';
        $data['reference'] = strtoupper(__FUNCTION__."-".$this->nameClass);
        $data['project'] = $this->proyecto;
        $data['errorUsuario'] = FALSE;

        //comprobamos si se envió formulario
        if(isset($_POST['submit-login']))
        {
            //comprobamos si existe variable sesesion email
            if(isset($this->session->userdata['email']))
            {
                //validamos el campo email
                $this->form_validation->set_rules('pass', 'Contraseña', 'required');
                $this->form_validation->set_error_delimiters('<div style="background-color: #fff; color: #e73d4a; opacity: 0.7;" class="alert alert-danger" role="alert">', '</div>');

                if($this->form_validation->run())
                {

                    $usuario = $this->doctrine->em->getRepository("Entities\\Usuarios")->findOneBy(["email" => $this->session->userdata['email']]);
                    //comprobamos la contraseña
                    if(password_verify($this->input->post('pass'), $usuario->getPass()))
                    {
                        $session_data['login'] = TRUE;
                        $this->session->set_userdata($session_data);

                        //creamos una entrada de actividad
                        $activity = new Entities\Useractivity;
                        //seteamos los datos
                        $activity->setIdusuario($usuario);
                        //guardamos
                        $this->doctrine->em->persist($activity);
                        $this->doctrine->em->flush();
                        //almacenamos el id userActivity
                        $session_data['idUserActivity'] = $activity->getId();
                        $this->session->set_userdata($session_data);
                        //redireccionamos al index
                        redirect('/');

                    }else{

                        $data['errorUsuario'] = '<div style="text-align: center; background-color: #fff; color: #e73d4a; opacity: 0.7;" class="alert alert-danger" role="alert">La contraseña con la que intentas acceder <br/>al panel de control no es correcta.</div>';

                    }

                }

            }else{

                //validamos el campo email
                $this->form_validation->set_rules('email', 'Email', 'required|valid_email');
                $this->form_validation->set_error_delimiters('<div style="background-color: #fff; color: #e73d4a; opacity: 0.7;" class="alert alert-danger" role="alert">', '</div>');

                if($this->form_validation->run())
                {
                    //si entramos comprobamos si existe un usuario con ese email
                    $usuario = $this->doctrine->em->getRepository("Entities\\Usuarios")->findOneBy(["email" => $this->input->post('email')]);
                    //si la consulta devuelve algo creamos sessión con el valor email
                    if($usuario)
                    {
                        //consultamos las tareas que tiene el usuario y almacenamos en el array 
                        //el número de estas.
                        $tareas = $this->doctrine->em->getRepository("Entities\\Tareas")->findBy(["idusuarioto" => $usuario->getId(),'estado' => 0]);

                        $session_data['email'] = $usuario->getEmail();
                        $session_data['image'] = $usuario->getImg();
                        $session_data['nombre'] = $usuario->getNombre().' '.$usuario->getApellidos();
                        $session_data['rol'] = $usuario->getIdrol()->getId();
                        $session_data['permisos'] = $usuario->getIdrol()->getPermisos();
                        $session_data['usuarioid'] = $usuario->getId();
                        $session_data['tareas'] = count($tareas);
                        //creamos login pero con el valor a false, ya que aún no se a terminado el logeo
                        $session_data['login'] = FALSE;
                        //creamos la sesión
                        $this->session->set_userdata($session_data);

                    }else{

                        $data['errorUsuario'] = '<div style="text-align: center; background-color: #fff; color: #e73d4a; opacity: 0.7;" class="alert alert-danger" role="alert">Lo sentimos, pero no existe ningún usuario con este email<br/> en nuestra base de datos.</div>';
                    }

                }

            }
        }
        //cargamos la vista, en este caso es la de login
        $this->load->view('templates/login/layout',$data);

	}

    public function timeout()
    {
        //obtenemos datos userActivity
        $activity = $this->doctrine->em->getRepository("Entities\\Useractivity")->findOneBy(["id" => $this->session->userdata('idUserActivity')]);
        //seteamos los datos
        $activity->setTimeout();
        //guardamos
        $this->doctrine->em->flush();
        //cambiamos el valor de login
        $session_data['login'] = FALSE;
        $this->session->set_userdata($session_data);
        redirect('login');
    }

	public function logout()
    {
        //obtenemos datos userActivity
        $activity = $this->doctrine->em->getRepository("Entities\\Useractivity")->findOneBy(["id" => $this->session->userdata('idUserActivity')]);
        //seteamos los datos
        $activity->setTimeout();
        //guardamos
        $this->doctrine->em->flush();
        //desmontamos las variables de sesión
        $this->session->unset_userdata('logged_in');
        //destruimos la sesión
        $this->session->sess_destroy();
        //redireccionamos a login
        redirect('login');
    }

}
