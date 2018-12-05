<?php
/**
 * Template Name: Ou se loger
 * Description: Template de la page Ou se loger
 */

$context = Timber::get_context();

$args = array(
  'post_category' => 'Logement',
  'posts_per_page' => 90,
);

$context['logements'] = new Timber\PostQuery($args);

Timber::render('template-ouseloger.twig', $context);
