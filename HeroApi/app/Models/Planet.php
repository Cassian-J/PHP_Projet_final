<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planet extends Model
{
    use HasFactory;

    protected $table = 'planet';
    protected $primaryKey = 'PlanetUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['PlanetUuid','UserUuid','PlanetName'];
}
