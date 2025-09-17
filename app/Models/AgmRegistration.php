<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AgmRegistration extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'membership_status',
        'attendance_type',
        'special_requirements',
        'ip_address',
        'user_agent',
        'registered_at',
    ];

    protected function casts(): array
    {
        return [
            'registered_at' => 'datetime',
        ];
    }

    public function getFullNameAttribute(): string
    {
        return $this->name . ' ' . $this->surname;
    }

    public function scopeMembers($query)
    {
        return $query->where('membership_status', 'member');
    }

    public function scopeVisitors($query)
    {
        return $query->where('membership_status', 'visitor');
    }

    public function scopeGuests($query)
    {
        return $query->where('membership_status', 'guest');
    }

    public function scopeInPerson($query)
    {
        return $query->where('attendance_type', 'in_person');
    }

    public function scopeVirtual($query)
    {
        return $query->where('attendance_type', 'virtual');
    }
}