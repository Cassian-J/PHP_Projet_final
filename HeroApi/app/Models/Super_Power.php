<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Super_Power extends Model
{
    use HasFactory;

    protected $table = 'superPower';
    protected $fillable = ['SuperPowerName','SuperPowerDescription'];


}
