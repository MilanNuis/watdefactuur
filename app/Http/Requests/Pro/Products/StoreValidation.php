<?php

namespace App\Http\Requests\Pro\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreValidation extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:255'],
            'price_without_btw' => ['required', 'numeric', 'min:0'],
            'price_with_btw' => ['required', 'numeric', 'min:0'],
            'btw' => ['required', 'numeric', 'min:0', 'max:100'],
        ];
    }
}
