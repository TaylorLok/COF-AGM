@extends('errors.layout')

@section('title', __('Bad Request'))
@section('code', '400')
@section('message', __('The request could not be understood by the server. Please check your input and try again.'))