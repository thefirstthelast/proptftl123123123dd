<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    public function persist(): User
    {
        $data = $this->validated();

        return User::create([
            'name' => $data['name'] ?? $data['email'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);
    }
}

