<?php
/**
 * Template Name: Logement
 * Description: Template des pages logement
 */

$context = Timber::get_context();
$context['post'] = new Timber\Post();

Timber::render('template-logement.twig', $context);
