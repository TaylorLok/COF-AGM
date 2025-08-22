@extends('errors.layout')

@section('title', __('Access Forbidden'))
@section('code', '403')
@section('message', __('You do not have permission to access this resource. Please contact your church administrator if you believe this is an error.'))