<?php

use Illuminate\Database\Seeder;
use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Städning' => [
                'slug' => 'stadning',
                'description' => '',
                'icon' => '',
                'subcats' => [
                    'Flyttstädning' => [
                        'slug' => 'flyttstadning',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Grovstädning' => [
                        'slug' => 'grovstadning',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Fönsterputsning' => [
                        'slug' => 'fonsterputsning',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Hemstädning' => [
                        'slug' => 'hemstadning',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Tvättning & Strykning' => [
                        'slug' => 'tvattning-strykning',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Övrig städning' => [
                        'slug' => 'ovrig-stadning',
                        'description' => '',
                        'icon' => ''
                    ]
                ]
            ],
            'Flytt & Transport' => [
                'slug' => 'flytt-transport',
                'description' => '',
                'icon' => '',
                'subcats' => [
                    'Flytthjälp' => [
                        'slug' => 'flytthjalp',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Gods- & Palltransport' => [
                        'slug' => 'gods-palltransport',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Kontorsflytt' => [
                        'slug' => 'kontorsflytt',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Magasinering & Förråd' => [
                        'slug' => 'magasinering-forrad',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Tyngre lyft' => [
                        'slug' => 'tyngre-lyft',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Utlandsflytt' => [
                        'slug' => 'utlandsflytt',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Övrig flytt' => [
                        'slug' => 'ovrig-flytt',
                        'description' => '',
                        'icon' => ''
                    ],
                    'Övrig transport' => [
                        'slug' => 'ovrig-transport',
                        'description' => '',
                        'icon' => ''
                    ]
                ]
            ],
            'Bygg & Renovering' => [
                'slug' => 'bygg-renovering',
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Tomt & Markarbeten' => [
                'slug' => 'tomt-markarbeten',
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Arkitekt & Inredning' => [
                'slug' => 'arkitekt-inredning',
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Ekonomi & Juridik' => [
                'slug' => 'ekonomi-juridik',
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Webb/IT & Design' => [
                'slug' => 'webb-it-design',
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Övriga Tjänster' => [
                'slug' => 'ovriga-tjanster',
                'description' => '',
                'icon' => '',
                'subcats' => []
            ]
        ];

        foreach ($categories as $name => $category) {
            $cat = Category::create([
                'slug' => $category['slug'],
                'name' => $name, 
                'description' => $category['description'], 
                'icon' => $category['icon']
            ]);

            foreach ($category['subcats'] as $subcatname => $subcat) {
                $subcat = Category::create([
                    'slug' => $subcat['slug'],
                    'name' => $subcatname, 
                    'description' => $subcat['description'], 
                    'parent' => $cat->id, 
                    'icon' => $subcat['icon']
                ]);
            }
        }
    }
}
