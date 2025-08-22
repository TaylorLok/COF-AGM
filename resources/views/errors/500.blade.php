@extends('errors.layout')

@section('title', __('Server Error'))
@section('code', '500')
@section('message', __('Something went wrong on our server. Our team has been notified. Please try again later.'))