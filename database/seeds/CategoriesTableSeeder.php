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
                'active' => true,
                'subcats' => [
                    'Flyttstädning' => [
                        'slug' => 'flyttstadning',
                        'description' => '',
                        'active' => true
                    ],
                    'Grovstädning' => [
                        'slug' => 'grovstadning',
                        'description' => '',
                        'active' => true
                    ],
                    'Fönsterputsning' => [
                        'slug' => 'fonsterputsning',
                        'description' => '',
                    ],
                    'Hemstädning' => [
                        'slug' => 'hemstadning',
                        'description' => '',
                        'active' => true
                    ],
                    'Tvättning & Strykning' => [
                        'slug' => 'tvattning-strykning',
                        'description' => '',
                    ],
                    'Övrig städning' => [
                        'slug' => 'ovrig-stadning',
                        'description' => '',
                    ]
                ]
            ],
            'Flytt & Transport' => [
                'slug' => 'flytt-transport',
                'description' => '',
                'active' => true,
                'subcats' => [
                    'Flytthjälp' => [
                        'slug' => 'flytthjalp',
                        'description' => '',
                        'active' => true
                    ],
                    'Gods- & Palltransport' => [
                        'slug' => 'gods-palltransport',
                        'description' => '',
                        'active' => true
                    ],
                    'Kontorsflytt' => [
                        'slug' => 'kontorsflytt',
                        'description' => '',
                        'active' => true
                    ],
                    'Magasinering & Förråd' => [
                        'slug' => 'magasinering-forrad',
                        'description' => '',
                    ],
                    'Tyngre lyft' => [
                        'slug' => 'tyngre-lyft',
                        'description' => '',
                        'active' => true
                    ],
                    'Utlandsflytt' => [
                        'slug' => 'utlandsflytt',
                        'description' => '',
                    ],
                    'Övrig flytt' => [
                        'slug' => 'ovrig-flytt',
                        'description' => '',
                    ],
                    'Övrig transport' => [
                        'slug' => 'ovrig-transport',
                        'description' => '',
                    ]
                ]
            ],
            'Bygg & Renovering' => [
                'slug' => 'bygg-renovering',
                'description' => '',
                'subcats' => [
                    'Elinstallation' => [
                        'slug' => 'elinstallation',
                        'description' => '',
                    ]
                ]
            ],
            'Tomt & Markarbeten' => [
                'slug' => 'tomt-markarbeten',
                'description' => '',
                'subcats' => [
                    'Stensättning' => [
                        'slug' => 'stensattning',
                        'description' => '',
                    ]
                ]
            ],
            'Arkitekt & Inredning' => [
                'slug' => 'arkitekt-inredning',
                'description' => '',
                'subcats' => [
                    'Heminredning' => [
                        'slug' => 'heminredning',
                        'description' => '',
                    ]
                ]
            ],
            'Ekonomi & Juridik' => [
                'slug' => 'ekonomi-juridik',
                'description' => '',
                'subcats' => [
                    'Bokslut' => [
                        'slug' => 'bokslut',
                        'description' => '',
                    ]
                ]
            ],
            'Webb/IT & Design' => [
                'slug' => 'webb-it-design',
                'description' => '',
                'subcats' => [
                    'Programmering' => [
                        'slug' => 'programmering',
                        'description' => '',
                    ]
                ]
            ],
            'Övriga Tjänster' => [
                'slug' => 'ovriga-tjanster',
                'description' => '',
                'subcats' => [
                    'Barnpassning' => [
                        'slug' => 'barnpassning',
                        'description' => '',
                        
                    ]
                ]
            ]
        ];

        foreach ($categories as $name => $category) {
            $cat = Category::create([
                'slug' => $category['slug'],
                'name' => $name, 
                'description' => $category['description'],
                'checklist_description' => $category['checklist_description'] ?? '',
                'active' => isset($category['active']) && $category['active'] ? true : false
            ]);

            foreach ($category['subcats'] as $subcatname => $subcat) {
                $subcat = Category::create([
                    'parent' => $cat->id,
                    'slug' => $subcat['slug'],
                    'name' => $subcatname, 
                    'description' => $subcat['description'], 
                    'checklist_description' => $subcat['checklist_description'] ?? '',
                    'active' => isset($subcat['active']) && $subcat['active'] ? true : false
                ]);
            }
        }
    }
}
