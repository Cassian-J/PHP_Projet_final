<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engin_Type extends Model
{
    use HasFactory;

    protected $table = 'enginType';
    protected $primaryKey = 'EnginTypeUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['EnginTypeUuid','UserUuid','EnginTypeName',];


}
