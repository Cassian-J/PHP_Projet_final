<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engin extends Model
{
    use HasFactory;

    protected $table = 'engin';
    protected $primaryKey = 'EnginUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['EnginUuid','UserUuid','SuperHeroUuid','EnginName','EnginDescription'];


}
