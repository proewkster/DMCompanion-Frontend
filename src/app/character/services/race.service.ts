import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../../models/race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  races: Race[]=[
    {
      "raceId": "0ox277cv-0be707a9-e8a8-42df-aca2-0ada7a28fcf7",
      "name": "Tiefling",
      "description": "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus—overlord of the Nine Hells—into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children’s children will always be held accountable.",
      "type": "Main",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce"
  },
  {
      "raceId": "0ox277cv-17a32a00-bbfa-4849-8c8b-9cf98a3a2274",
      "name": "Halfling",
      "description": "The comforts of home are the goals of most halflings’ lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies; a blazing fire and a generous meal; fine drink and fine conversation. Though some halflings live out their days in remote agricultural communities, others form nomadic bands that travel constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. But even these wanderers love peace, food, hearth, and home, though home might be a wagon jostling along a dirt road or a raft floating downriver.",
      "type": "Main",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f"
  },
  {
      "raceId": "0ox277cv-24ee8457-3e73-4c18-ac3b-ee9685f2d768",
      "name": "Mountain Dwarf",
      "description": "As a mountain dwarf, you’re strong and hardy, accustomed to a difficult life in rugged terrain. You’re probably on the tall side (for a dwarf), and tend toward lighter coloration. The shield dwarves of northern Faerûn, as well as the ruling Hylar clan and the noble Daewar clan of Dragonlance, are mountain dwarves.",
      "type": "Sub",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce",
      "parentId": "0ox277cv-4e752e75-92a4-4859-8f41-fd3c4d05d443"
  },
  {
      "raceId": "0ox277cv-343fdf69-db67-4d71-81e0-023dc6e93155",
      "name": "Half-Elf",
      "description": "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves. Some half-elves live among humans, set apart by their emotional and physical differences, watching friends and loved ones age while time barely touches them. Others live with the elves, growing restless as they reach adulthood in the timeless elven realms, while their peers continue to live as children. Many half-elves, unable to fit into either society, choose lives of solitary wandering or join with other misfits and outcasts in the adventuring life.",
      "type": "Main",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce"
  },
  {
      "raceId": "0ox277cv-41e6b354-6f8a-46cd-9f69-f05d591eaa8c",
      "name": "Rock Gnome",
      "description": "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes. Most gnomes in the worlds of D&D are rock gnomes, including the tinker gnomes of the Dragonlance setting.",
      "type": "Sub",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce",
      "parentId": "0ox277cv-c51f0f78-b47e-4313-b740-50d24ac60464"
  },
  {
      "raceId": "0ox277cv-436c77a1-ec04-42e2-a6dd-176eb223363c",
      "name": "Lightfoot Halfling",
      "description": "As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You’re inclined to be affable and get along well with others. In the Forgotten Realms, lightfoot halflings have spread the farthest and thus are the most common variety.",
      "type": "Sub",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f",
      "parentId": "0ox277cv-17a32a00-bbfa-4849-8c8b-9cf98a3a2274"
  },
  {
      "raceId": "0ox277cv-4e752e75-92a4-4859-8f41-fd3c4d05d443",
      "name": "Dwarf",
      "description": "Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller. Their courage and endurance are also easily a match for any of the larger folk.",
      "type": "Main",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f"
  },
  {
      "raceId": "0ox277cv-643dde8c-9a22-403d-8c43-199016c8812d",
      "name": "Stout Halfling",
      "description": "As a stout halfling, you’re hardier than average and have some resistance to poison. Some say that stouts have dwarven blood. In the Forgotten Realms, these halflings are called stronghearts, and they’re most common in the south.",
      "type": "Sub",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce",
      "parentId": "0ox277cv-17a32a00-bbfa-4849-8c8b-9cf98a3a2274"
  },
  {
      "raceId": "0ox277cv-6ca19e5f-55b0-486b-9988-cf369d1649fd",
      "name": "Hill Dwarf",
      "description": "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience. The gold dwarves of Faerûn in their mighty southern kingdom are hill dwarves, as are the exiled Neidar and the debased Klar of Krynn in the Dragonlance setting.",
      "type": "Sub",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f",
      "parentId": "0ox277cv-4e752e75-92a4-4859-8f41-fd3c4d05d443"
  },
  {
      "raceId": "0ox277cv-7469abaa-0ba3-445d-a02c-928876111f15",
      "name": "Half-Orc",
      "description": "Whether united under the leadership of a mighty warlock or having fought to a standstill after years of conflict, orc and human tribes sometimes form alliances, joining forces into a larger horde to the terror of civilized lands nearby. When these alliances are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals. Some venture into the world to prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.",
      "type": "Main",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce"
  },
  {
      "raceId": "0ox277cv-8310ecb8-b917-49d2-9b0a-ffbfeba9fa86",
      "name": "Variant Human",
      "description": "In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that’s why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.",
      "type": "Main",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f"
  },
  {
      "raceId": "0ox277cv-8a9e723c-3aa4-4583-897b-c045018449c2",
      "name": "Dark Elf (Drow)",
      "description": "Descended from an earlier subrace of elves, the drow were banished from the surface world for following the goddess Lolth down the path of evil. Now they have built their own civilization in the depths of the Underdark, patterned after the Way of Lolth. Also called dark elves, the drow have skin that resembles charcoal or obsidian, as well as stark white or pale yellow hair. They commonly have very pale eyes (so pale as to be mistaken for white) in shades of lilac, silver, pink, red, and blue. They tend to be smaller and thinner than most elves.",
      "type": "Sub",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce",
      "parentId": "0ox277cv-f53100b6-9f16-4295-9f70-1e9d008818c3"
  },
  {
      "raceId": "0ox277cv-a862d215-8a15-46c3-8e96-0d58c5bb82cb",
      "name": "Dragonborn",
      "description": "Born of dragons, as their name proclaims, the dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by draconic gods or the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids. Some dragonborn are faithful servants to true dragons, others form the ranks of soldiers in great wars, and still others find themselves adrift, with no clear calling in life.",
      "type": "Main",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce"
  },
  {
      "raceId": "0ox277cv-bb9809e5-008c-476b-acec-7424b36991fe",
      "name": "Forest Gnome",
      "description": "As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth. In the worlds of D&D, forest gnomes are rare and secretive. They gather in hidden communities in sylvan forests, using illusions and trickery to conceal themselves from threats or to mask their escape should they be detected. Forest gnomes tend to be friendly with other good-spirited woodland folk, and they regard elves and good fey as their most important allies. These gnomes also befriend small forest animals and rely on them for information about threats that might prowl their lands.",
      "type": "Sub",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce",
      "parentId": "0ox277cv-c51f0f78-b47e-4313-b740-50d24ac60464"
  },
  {
      "raceId": "0ox277cv-c4cb3027-0f42-428f-bfeb-f261a6165238",
      "name": "High Elf",
      "description": "As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many of the worlds of D&D, there are two kinds of high elves. One type (which includes the gray elves and valley elves of Greyhawk, the Silvanesti of Dragonlance, and the sun elves of the Forgotten Realms) is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type (including the high elves of Greyhawk, the Qualinesti of Dragonlance, and the moon elves of the Forgotten Realms) are more common and more friendly, and often encountered among humans and other races.",
      "type": "Sub",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f",
      "parentId": "0ox277cv-f53100b6-9f16-4295-9f70-1e9d008818c3"
  },
  {
      "raceId": "0ox277cv-c51f0f78-b47e-4313-b740-50d24ac60464",
      "name": "Gnome",
      "description": "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.",
      "type": "Main",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce"
  },
  {
      "raceId": "0ox277cv-d104cf02-08e8-4e73-ba69-8a3ffcd97d28",
      "name": "Human",
      "description": "In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that’s why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.",
      "type": "Main",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f"
  },
  {
      "raceId": "0ox277cv-e039a1c5-ca38-4f5c-a0df-de010e81b0b7",
      "name": "Wood Elf",
      "description": "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests. This category includes the wild elves (grugach) of Greyhawk and the Kagonesti of Dragonlance, as well as the races called wood elves in Greyhawk and the Forgotten Realms. In Faerûn, wood elves (also called wild elves, green elves, or forest elves) are reclusive and distrusting of non-elves.",
      "type": "Sub",
      "sourceId": "v60w78cq-4af042cf-f725-4d97-a48f-25184a9abfce",
      "parentId": "0ox277cv-f53100b6-9f16-4295-9f70-1e9d008818c3"
  },
  {
      "raceId": "0ox277cv-f53100b6-9f16-4295-9f70-1e9d008818c3",
      "name": "Elf",
      "description": "Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. They live in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry, and the good things of the world.",
      "type": "Main",
      "sourceId": "v60w78cq-77f20c26-3c7c-4779-8cd2-ef6419325b8f"
  }
  ]
  constructor(private http: HttpClient) { }
  // getRaceNames():Observable<string[]> {
  //   return this.http.get<string[]>("");
  // }
  getRaceNames() {
    return this.races;
  }
}
