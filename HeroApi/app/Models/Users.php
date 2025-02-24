<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $primaryKey = 'UserUuid';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['UserUuid','UserName','UserFirstName','UserPwd','UserMail'];
}
