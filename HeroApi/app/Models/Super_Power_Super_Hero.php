<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Super_Power_Super_Hero extends Model
{
    use HasFactory;

    protected $table = 'superPower_superHero';
    protected $fillable = ['SuperPowerUuid','SuperHeroUuid'];
    
}
