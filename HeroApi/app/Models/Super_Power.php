<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Super_Power extends Model
{
    use HasFactory;

    protected $table = 'superPower';
    protected $primaryKey = 'SuperPowerUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['SuperPowerUuid','UserUuid','SuperPowerName','SuperPowerDescription'];


}
