<?php

use Illuminate\Database\Seeder;
use App\ChecklistItem;
use App\Category;

class ChecklistItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $checklistItems = [
        	[
        		'title' => 'Har du förklarat vilket material du vill använda?',
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque convallis, lacinia purus ut, interdum nibh. Vestibulum fermentum arcu id elementum sagittis. Donec aliquam eros non urna luctus luctus. Etiam porta, orci et ultrices ullamcorper, ante erat ultricies urna, at feugiat sapien quam ut ligula.',
        		'categories' => ['flyttstadning', 'flytthjalp', 'grovstadning', 'hemstadning']
        	],
        	[
        		'title' => 'Har du förklarat hur många kvadratmeter det gäller?',
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque convallis, lacinia purus ut, interdum nibh. Vestibulum fermentum arcu id elementum sagittis. Donec aliquam eros non urna luctus luctus. Etiam porta, orci et ultrices ullamcorper, ante erat ultricies urna, at feugiat sapien quam ut ligula.',
        		'categories' => ['flyttstadning', 'flytthjalp', 'kontorsflytt']
        	],
        	[
        		'title' => 'Har du förklarat hur många hörn rummet har?',
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque convallis, lacinia purus ut, interdum nibh. Vestibulum fermentum arcu id elementum sagittis. Donec aliquam eros non urna luctus luctus. Etiam porta, orci et ultrices ullamcorper, ante erat ultricies urna, at feugiat sapien quam ut ligula.',
        		'categories' => ['flyttstadning', 'flytthjalp', 'grovstadning', 'kontorsflytt', 'tyngre-lyft']
        	],
        	[
        		'title' => 'Har du förklarat bla bla bla 1?',
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque convallis, lacinia purus ut, interdum nibh. Vestibulum fermentum arcu id elementum sagittis. Donec aliquam eros non urna luctus luctus. Etiam porta, orci et ultrices ullamcorper, ante erat ultricies urna, at feugiat sapien quam ut ligula.',
        		'categories' => ['grovstadning', 'hemstadning', 'gods-palltransport', 'tyngre-lyft']
        	],
        	[
        		'title' => 'Har du förklarat bla bla bla 2',
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque convallis, lacinia purus ut, interdum nibh. Vestibulum fermentum arcu id elementum sagittis. Donec aliquam eros non urna luctus luctus. Etiam porta, orci et ultrices ullamcorper, ante erat ultricies urna, at feugiat sapien quam ut ligula.',
        		'categories' => ['grovstadning', 'gods-palltransport', 'kontorsflytt']
        	],
        	[
        		'title' => 'Har du förklarat bla bla bla 3',
        		'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu neque convallis, lacinia purus ut, interdum nibh. Vestibulum fermentum arcu id elementum sagittis. Donec aliquam eros non urna luctus luctus. Etiam porta, orci et ultrices ullamcorper, ante erat ultricies urna, at feugiat sapien quam ut ligula.',
        		'categories' => ['hemstadning', 'gods-palltransport', 'tyngre-lyft']
        	],
        ];

        foreach ($checklistItems as $checklistItem) {
        	$item = ChecklistItem::create([
        		'title' => $checklistItem['title'],
        		'description' => $checklistItem['description'],
        	]);

        	$categories = Category::whereIn('slug', $checklistItem['categories'])->get();
        	foreach ($categories as $category) {
        		$category->checklistItems()->attach($item);
        	}
        }
    }
}
