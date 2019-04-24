<?php

namespace Entities;

/**
 * Notes
 *
 * @Table(name="notes")
 * @Entity
 */

class Notes
{
    /**
     * @var integer
     *
     * @Column(name="id", type="integer", precision=0, scale=0, nullable=false, unique=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
	private $id;
	
    /**
     * @var \DateTime
     *
     * @Column(name="fregistro", type="datetime", precision=0, scale=0, nullable=false, unique=false)
     */
    private $fregistro;

    /**
     * @var \Registros
     *
     * @ManyToOne(targetEntity="Registros")
     * @JoinColumns({
     *   @JoinColumn(name="idRegistro", referencedColumnName="id", nullable=true)
     * })
     */
	
    private $idregistro;

    /**
     * @var \Usuarios
     *
     * @ManyToOne(targetEntity="Usuarios")
     * @JoinColumns({
     *   @JoinColumn(name="idUsuario", referencedColumnName="id", nullable=true)
     * })
     */
	private $idusuario;
	
    /**
     * @var string
     *
     * @Column(name="note", type="text", length=65535, precision=0, scale=0, nullable=true, unique=false)
     */
    private $note;

    public function __construct()
    {
        $this->fregistro = new \DateTime("now");
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set fregistro
     *
     * @param \DateTime $fregistro
     *
     * @return Notes
     */
    public function setFregistro($fregistro)
    {
        $this->fregistro = $fregistro;

        return $this;
    }

    /**
     * Get fregistro
     *
     * @return \DateTime
     */
    public function getFregistro()
    {
        return $this->fregistro;
    }

    /**
     * Set idregistro
     *
     * @param \Registro $idregistro
     *
     * @return Notes
     */
    public function setIdregistro($idregistro)
    {
        $this->idregistro = $idregistro;

        return $this;
    }

    /**
     * Get idregistro
     *
     * @return \Registros
     */
    public function getIdregistro()
    {
        return $this->idregistro;
    }

    /**
     * Set idusuario
     *
     * @param \Usuarios $idusuario
     *
     * @return Notes
     */
    public function setIdusuario($idusuario)
    {
        $this->idusuario = $idusuario;

        return $this;
    }

    /**
     * Get idusuario
     *
     * @return \Usuarios
     */
    public function getIdusuario()
    {
        return $this->idusuario;
    }

    /**
     * Set note
     *
     * @param string $note
     *
     * @return Notes
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string
     */
    public function getNote()
    {
        return $this->note;
    }
}

