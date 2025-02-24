<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gadget extends Model
{
    use HasFactory;

    protected $table = 'gadget';
    protected $primaryKey = 'UserUuid';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['GadgetUuid','SuperHeroUuid','GadgetName','GadgetDescription'];
}
