@extends('errors.layout')

@section('title', __('Request Conflict'))
@section('code', '409')
@section('message', __('The request could not be completed due to a conflict with the current state. Please refresh the page and try again.'))