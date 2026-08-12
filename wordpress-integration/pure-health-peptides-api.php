<?php
/**
 * Plugin Name: Pure Health Peptides — Headless API Extensions
 * Description: Registers the "COA" and "Product Info Card" custom post
 *              types and a small public REST namespace (php/v1) that the
 *              Next.js storefront reads from. Install as a standalone
 *              plugin (zip this file) or as a must-use plugin by copying
 *              it into wp-content/mu-plugins/.
 * Version:     1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* -----------------------------------------------------------------------
 * 1. Custom post types
 * ---------------------------------------------------------------------*/

add_action( 'init', function () {
	register_post_type( 'coa', array(
		'label'        => 'Certificates of Analysis',
		'public'       => false,
		'show_ui'      => true,
		'show_in_menu' => true,
		'supports'     => array( 'title' ),
		'menu_icon'    => 'dashicons-media-document',
	) );

	register_post_type( 'info_card', array(
		'label'        => 'Product Info Cards',
		'public'       => false,
		'show_ui'      => true,
		'show_in_menu' => true,
		'supports'     => array( 'title' ),
		'menu_icon'    => 'dashicons-media-text',
	) );

	// COA meta fields
	$coa_meta = array(
		'batch_number'    => 'string',
		'product_name'    => 'string',
		'purity_percent'  => 'number',
		'testing_date'    => 'string', // ISO date, e.g. 2026-06-12
		'laboratory'      => 'string',
		'download_url'    => 'string', // URL to the PDF (Media Library or external)
	);
	foreach ( $coa_meta as $key => $type ) {
		register_post_meta( 'coa', $key, array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => $type,
			'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
		) );
	}

	// Info Card meta fields
	$info_card_meta = array(
		'product_slug'  => 'string', // must match the WooCommerce product slug
		'product_name'  => 'string',
		'format'        => 'string', // vial | capsule | liquid | topical
		'category_slug' => 'string',
		'download_url'  => 'string',
	);
	foreach ( $info_card_meta as $key => $type ) {
		register_post_meta( 'info_card', $key, array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => $type,
			'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
		) );
	}
} );

/* -----------------------------------------------------------------------
 * 1b. Extra meta fields on the WooCommerce "product" post type.
 *     These ride along in the normal WooCommerce REST product response
 *     (in `meta_data`) once registered with show_in_rest — no custom
 *     route needed for these.
 * ---------------------------------------------------------------------*/

add_action( 'init', function () {
	register_post_meta( 'product', 'research_applications', array(
		'show_in_rest' => true,
		'single'       => true,
		'type'         => 'string', // comma-separated, e.g. "Tissue repair studies, Angiogenesis research"
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );

	register_post_meta( 'product', 'specifications', array(
		'show_in_rest' => true,
		'single'       => true,
		'type'         => 'string', // JSON string: [{"label":"Purity","value":"\u2265\ub099%99%"}]
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );

	register_post_meta( 'product', 'coa_id', array(
		'show_in_rest' => true,
		'single'       => true,
		'type'         => 'string', // matches a "coa" post's batch_number
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );

	register_post_meta( 'product', 'info_card_id', array(
		'show_in_rest' => true,
		'single'       => true,
		'type'         => 'string', // matches an "info_card" post's product_slug
		'auth_callback' => function () { return current_user_can( 'edit_posts' ); },
	) );
} );

/* -----------------------------------------------------------------------
 * 2. Custom REST routes (public, read-only): /wp-json/php/v1/...
 * ---------------------------------------------------------------------*/

add_action( 'rest_api_init', function () {

	// GET /wp-json/php/v1/coa?batch_number=BPC157-2406A
	register_rest_route( 'php/v1', '/coa', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'args'                => array(
			'batch_number' => array( 'required' => true ),
		),
		'callback'            => function ( WP_REST_Request $request ) {
			$batch_number = sanitize_text_field( $request->get_param( 'batch_number' ) );

			$posts = get_posts( array(
				'post_type'   => 'coa',
				'post_status' => 'publish',
				'numberposts' => 1,
				'meta_key'    => 'batch_number',
				'meta_value'  => $batch_number,
			) );

			if ( empty( $posts ) ) {
				return new WP_REST_Response( null, 404 );
			}

			return new WP_REST_Response( php_map_coa_post( $posts[0] ), 200 );
		},
	) );

	// GET /wp-json/php/v1/info-cards
	register_rest_route( 'php/v1', '/info-cards', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function ( WP_REST_Request $request ) {
			$posts = get_posts( array(
				'post_type'   => 'info_card',
				'post_status' => 'publish',
				'numberposts' => (int) $request->get_param( 'per_page' ) ?: 100,
			) );

			return new WP_REST_Response( array_map( 'php_map_info_card_post', $posts ), 200 );
		},
	) );

	// GET /wp-json/php/v1/info-cards/{product_slug}
	register_rest_route( 'php/v1', '/info-cards/(?P<slug>[a-zA-Z0-9-]+)', array(
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function ( WP_REST_Request $request ) {
			$posts = get_posts( array(
				'post_type'   => 'info_card',
				'post_status' => 'publish',
				'numberposts' => 1,
				'meta_key'    => 'product_slug',
				'meta_value'  => sanitize_text_field( $request->get_param( 'slug' ) ),
			) );

			if ( empty( $posts ) ) {
				return new WP_REST_Response( null, 404 );
			}

			return new WP_REST_Response( php_map_info_card_post( $posts[0] ), 200 );
		},
	) );
} );

function php_map_coa_post( WP_Post $post ): array {
	return array(
		'batch_number'   => get_post_meta( $post->ID, 'batch_number', true ),
		'product_name'   => get_post_meta( $post->ID, 'product_name', true ),
		'purity_percent' => (float) get_post_meta( $post->ID, 'purity_percent', true ),
		'testing_date'   => get_post_meta( $post->ID, 'testing_date', true ),
		'laboratory'     => get_post_meta( $post->ID, 'laboratory', true ),
		'download_url'   => get_post_meta( $post->ID, 'download_url', true ),
	);
}

function php_map_info_card_post( WP_Post $post ): array {
	return array(
		'product_slug'  => get_post_meta( $post->ID, 'product_slug', true ),
		'product_name'  => get_post_meta( $post->ID, 'product_name', true ),
		'format'        => get_post_meta( $post->ID, 'format', true ),
		'category_slug' => get_post_meta( $post->ID, 'category_slug', true ),
		'download_url'  => get_post_meta( $post->ID, 'download_url', true ),
	);
}
