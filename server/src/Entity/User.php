<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity
 */
class User implements JsonSerializable
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private  $id;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=40, nullable=false, options={"fixed"=true})
     */
    private  $username;

    /**
     * @var string
     *
     * @ORM\Column(name="password", type="string", length=300, nullable=false, options={"fixed"=true})
     */
    private  $password;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private  $name;

    /**
     * @var string|null
     *
     * @ORM\Column(name="active", type="boolean", length=40, nullable=true, options={"fixed"=true})
     */
    private  $active;

    /**
     * @var string|null
     *
     * @ORM\Column(name="admin", type="boolean", nullable=true, options={"fixed"=true})
     */
    private  $admin;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get username.
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set username.
     *
     * @param string $username
     *
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get password.
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }


    /**
     * Set password.
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name.
     *
     * @param string|null $name
     *
     * @return User
     */
    public function setName($name = null)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get admin
     *
     * @return boolean|null
     */
    public function getAdmin()
    {
        return $this->admin;
    }

    /**
     * Set Admin
     *
     * @param boolean|null $admin
     *
     * @return User
     */
    public function setAdmin($admin = false)
    {
        $this->admin = $admin;

        return $this;
    }

    /**
     * Get Active
     *
     * @return boolean|null
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set Active
     *
     * @param boolean|null $active
     *
     * @return User
     */
    public function setActive($active = true)
    {
        $this->active = $active;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "username" => $this->username,
            "active" => $this->active,
            "admin" => $this->admin
        ];
    }

}
