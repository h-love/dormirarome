<?php

$context                = Timber::get_context();
$post                   = new TimberPost();
$context['post']        = $post;
$context['cancel_link'] = get_cancel_comment_reply_link(__('Cancel reply', 'base-camp'));

$args = array(
  'post_type' => 'post',
  'category__not_in' => 3, //3 = id logement
  'posts_per_page' => 3,
  'orderby' => 'rand'
);

$context['blogpost_suggestions'] = new Timber\PostQuery($args);


$string = $post->get_field( "quartier");
$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string)));
$args = array(
  'post_type' => 'post',
  'category__not_in' => 3, //3 = id logement
  'tag' => $slug,
  'posts_per_page' => 3,
  'orderby' => 'rand'
);

$context['logement_links'] = new Timber\PostQuery($args);

if (post_password_required($post->ID)) {
    Timber::render('single-password.twig', $context);
} else {
    Timber::render(['single-' . $post->ID . '.twig', 'single-' . $post->categories[0] . '.twig', 'single.twig'], $context);
}
