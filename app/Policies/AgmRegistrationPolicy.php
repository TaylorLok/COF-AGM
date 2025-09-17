<?php

namespace App\Policies;

use App\Models\AgmRegistration;
use App\Models\User;

class AgmRegistrationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, AgmRegistration $agmRegistration): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(?User $user): bool
    {
        // Anyone can register for AGM
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, AgmRegistration $agmRegistration): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, AgmRegistration $agmRegistration): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, AgmRegistration $agmRegistration): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, AgmRegistration $agmRegistration): bool
    {
        return $user->isAdmin();
    }
}