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
                'description' => '',
                'icon' => '',
                'subcats' => [
                    'Flyttstädning' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Grovstädning' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Fönsterputsning' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Hemstädning' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Tvättning & Strykning' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Övrig städning' => [
                        'description' => '',
                        'icon' => ''
                    ]
                ]
            ],
            'Flytt & Transport' => [
                'description' => '',
                'icon' => '',
                'subcats' => [
                    'Flytthjälp' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Gods- & Palltransport' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Kontorsflytt' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Magasinering & Förråd' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Tvättning & Strykning' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Tyngre lyft' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Utlandsflytt' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Utlandsflytt' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Övrig flytt' => [
                        'description' => '',
                        'icon' => ''
                    ],
                    'Övrig transport' => [
                        'description' => '',
                        'icon' => ''
                    ]
                ]
            ],
            'Bygg & Renovering' => [
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Tomt & Markarbeten' => [
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Arkitekt & Inredning' => [
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Ekonomi & Juridik' => [
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Webb/IT & Design' => [
                'description' => '',
                'icon' => '',
                'subcats' => []
            ],
            'Övriga Tjänster' => [
                'description' => '',
                'icon' => '',
                'subcats' => []
            ]
        ];

        foreach ($categories as $name => $category) {
            $cat = Category::create(['name' => $name, 'description' => $category['description'], 'icon' => $category['icon']]);

            foreach ($category['subcats'] as $subcatname => $subcat) {
                $subcat = Category::create(['name' => $subcatname, 'description' => $subcat['description'], 'parent' => $cat->id, 'icon' => $subcat['icon']]);
            }
        }
    }
}
