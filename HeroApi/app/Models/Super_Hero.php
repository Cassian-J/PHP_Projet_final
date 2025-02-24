<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Super_Hero extends Model
{
    use HasFactory;

    protected $table = 'superHero';
    protected $primaryKey = 'UserUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['SuperHeroUuid','SuperHeroName','SuperHeroSex','SuperHeroDescription'];
}
