<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'city';
    protected $primaryKey = 'CityUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['CityUuid','UserUuid','CityName'];

}
