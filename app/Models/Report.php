<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'filename',
        'original_filename',
        'file_path',
        'file_size',
        'mime_type',
        'description'
    ];

    protected $appends = ['file_size_human', 'total_downloads', 'unique_downloads'];

    public function downloads(): HasMany
    {
        return $this->hasMany(ReportDownload::class);
    }

    public function downloadedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'report_downloads')
                    ->withTimestamps()
                    ->withPivot('ip_address', 'user_agent');
    }

    public function getFileSizeHumanAttribute(): string
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }

    public function getTotalDownloadsAttribute(): int
    {
        return $this->downloads()->count();
    }

    public function getUniqueDownloadsAttribute(): int
    {
        return $this->downloads()->distinct('user_id')->count('user_id');
    }
}