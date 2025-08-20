<?php

namespace App\Http\Requests\ReportRequests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file'        => ['required', 'file', 'mimes:pdf,doc,docx,xls,xlsx,ppt,pptx', 'max:10240'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The report title is required.',
            'file.required'  => 'A file must be uploaded.',
            'file.mimes'     => 'The file must be one of: pdf, doc, docx, xls, xlsx, ppt, pptx.',
            'file.max'       => 'The file may not be greater than 10MB.',
        ];
    }
}
