<?php
/**
 * Template Name: Blog
 * Description: Template de la page Blog
 */

global $paged;
if (!isset($paged) || !$paged){
  $paged = 1;
}

$context = Timber::get_context();

$args = array(
  'post_type' => 'post',
  'category__not_in' => 3, //3 = id logement
  'posts_per_page' => 9,
  'paged' => $paged
);

$context['posts'] = new Timber\PostQuery($args);

Timber::render('template-blog.twig', $context);
