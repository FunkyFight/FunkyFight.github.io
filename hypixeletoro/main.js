//Variables
var hide_negative_percent = false;

window.onload = function() {
	$("#percent_hide").click(function() {
		hide_negative_percent = !hide_negative_percent;
		console.log("Negative Percents Variable set to " + hide_negative_percent)

		if( hide_negative_percent ) {
			$("#percent_hide").html("Montrer les pourcentages n\u00e9gatifs")
		} else {
			$("#percent_hide").html("Cacher les pourcentages n\u00e9gatifs")
		}
	})

}

window.setInterval(function() {
	fetch("https://api.hypixel.net/skyblock/bazaar")
	.then(function(response) {
		return response.json();
	}).then(function(j) {
		//Farming
		fetchMaterial(j, "WHEAT", "enchanted_BREAD", 160);
		fetchMaterial(j, "hay_block", "enchanted_hay_block", 144);
		fetchMaterial(j, "carrot_item", "enchanted_carrot", 160);
		fetchMaterial(j, "potato_item", "enchanted_potato", 160);
		fetchMaterial(j, "enchanted_potato", "enchanted_baked_potato", 160);
		fetchMaterial(j, "pumpkin", "enchanted_pumpkin", 160)
		fetchMaterial(j, "melon", "enchanted_melon", 160)
		fetchMaterial(j, "enchanted_melon", "enchanted_melon_block", 160)
		fetchMaterial(j, "seeds", "enchanted_seeds", 160)
		fetchMaterial(j, "red_mushroom", "enchanted_red_mushroom", 160)
		fetchMaterial(j, "ink_sack:3", "enchanted_cocoa", 160)
		fetchMaterial(j, "cactus", "enchanted_cactus", 160*160)
		fetchMaterial(j, "sugar_cane", "enchanted_sugar", 160)
		fetchMaterial(j, "enchanted_sugar", "enchanted_sugar_cane", 160)
		fetchMaterial(j, "feather", "enchanted_feather", 160)
		fetchMaterial(j, "leather", "enchanted_leather", 576)
		fetchMaterial(j, "raw_beef", "enchanted_raw_beef", 160)
		fetchMaterial(j, "pork", "enchanted_pork", 160)
		fetchMaterial(j, "raw_chicken", "enchanted_raw_chicken", 160)
		fetchMaterial(j, "mutton", "enchanted_mutton", 160)
		//fetchMaterial(j, "nether_warts", "enchanted_nether_warts")

		//Combat


		//Combat
		fetchMaterial(j, "rotten_flesh", "enchanted_rotten_flesh", 160)
		fetchMaterial(j, "bone", "enchanted_bone", 160)
		fetchMaterial(j, "enchanted_bone", "enchanted_bone_block", 160)
		fetchMaterial(j, "string", "enchanted_string", 192)
		fetchMaterial(j, "spider_eye", "enchanted_spider_eye", 160)
		fetchMaterial(j, "sulphur", "enchanted_gunpowder", 160)
		fetchMaterial(j, "ender_pearl", "enchanted_ender_pearl", 160)
		fetchMaterial(j, "ghast_tear", "enchanted_ghast_tear", 160)
		fetchMaterial(j, "slime_ball", "enchanted_slime_ball", 160)
		fetchMaterial(j, "enchanted_slime_ball", "enchanted_slime_block", 160)
		fetchMaterial(j, "blaze_rod", "enchanted_blaze_powder", 160)
		fetchMaterial(j, "enchanted_blaze_powder", "enchanted_blaze_rod", 160)
		fetchMaterial(j, "magma_cream", "enchanted_magma_cream", 160)
		fetchMaterial(j, "enchanted_sponge", "enchanted_wet_sponge", 40)

		//Mining
		fetchMaterial(j, "cobblestone", "enchanted_cobblestone", 160)
		fetchMaterial(j, "coal", "enchanted_coal", 160)
		fetchMaterial(j, "enchanted_coal", "enchanted_coal_block", 160)
		fetchMaterial(j, "iron", "enchanted_iron", 160)
		fetchMaterial(j, "enchanted_iron", "enchanted_iron_block", 160)
		fetchMaterial(j, "gold", "enchanted_gold", 160)
		fetchMaterial(j, "enchanted_gold", "enchanted_gold_block", 160)
		fetchMaterial(j, "diamond", "enchanted_diamond", 160)
		fetchMaterial(j, "enchanted_diamond", "enchanted_diamond_block", 160)
		fetchMaterial(j, "ink_sack:4", "enchanted_lapis_lazuli", 160)
		fetchMaterial(j, "enchanted_lapis_lazuli", "enchanted_lapis_lazuli_block", 160)
		fetchMaterial(j, "emerald", "enchanted_emerald", 160)
		fetchMaterial(j, "enchanted_emerald", "enchanted_emerald_block", 160)
		fetchMaterial(j, "redstone", "enchanted_redstone", 160)
		fetchMaterial(j, "enchanted_redstone", "enchanted_redstone_block", 160)
		fetchMaterial(j, "quartz", "enchanted_quartz", 160)
		fetchMaterial(j, "enchanted_quartz", "enchanted_quartz_block", 160)
		fetchMaterial(j, "obsidian", "enchanted_obsidian", 160)
		fetchMaterial(j, "glowstone_dust", "enchanted_glowstone_dust", 160)
		fetchMaterial(j, "enchanted_glowstone_dust", "enchanted_glowstone", 160)
		fetchMaterial(j, "flint", "enchanted_flint", 160)
		fetchMaterial(j, "ice", "enchanted_ice", 160)
		fetchMaterial(j, "enchanted_ice", "enchanted_packed_ice", 160)
		fetchMaterial(j, "sand", "enchanted_sand", 160)
		fetchMaterial(j, "end_stone", "enchanted_end_stone", 160)
		fetchMaterial(j, "snowball", "snow_block", 4)
		fetchMaterial(j, "snowball", "enchanted_snow_block", 640)
		fetchMaterial(j, "snow_block", "enchanted_snow_block", 160)
	})




}, 1000)






function fetchMaterial(json, materialname, enchantmaterial, multiplier) {



		var x = json;
		var buyPrice;
		var sellPrice;
		var normalEnchantPrice;
		var percent;
		var benef;
		materialname = materialname.toUpperCase();
		enchantmaterial = enchantmaterial.toUpperCase();



		//Wheat —> Bread
		buyPrice = x.products[materialname].sell_summary[0].pricePerUnit + 0.1
		buyPrice = buyPrice.toFixed(1)
		normalEnchantPrice = buyPrice*multiplier
		sellPrice = x.products[enchantmaterial].buy_summary[0].pricePerUnit - 0.1
		sellPrice = sellPrice.toFixed(1)
		percent = 100*sellPrice/normalEnchantPrice;
		percent = percent - 100;
		percent = percent.toFixed(1)
		benef = sellPrice-normalEnchantPrice;
		benef = benef.toFixed(1);


		if(materialname == "INK_SACK:3") materialname = "COCOA_BEANS";

		$("." + materialname).remove();
		if( Math.sign(percent) == -1) {
			if(hide_negative_percent) return;
			$(".table-body").after("<tr style=\"background-color:#c0392b\" class=\""+materialname+"\"><td data-label=\"Item\" class=\"invslot-item invslot-item-image\" data-minetip-title=\"\&f"+materialname+"\" data-minetip-text=\"\&f"+materialname+"\">"+materialname + " <img src=\"images\\arrow.png\"></img> " + enchantmaterial +"</td><td data-label=\"Prix Multiplié (enchant)\">" + normalEnchantPrice + " (x"+multiplier+")</td><td data-label=\"Prix x1 (enchant)\">"+sellPrice+"</td></td><td data-label=\"Recette net\">"+benef+" coins/i</td><td data-label=\"Pourcentage\">"+percent+"%</td></tr>")

		} else {
			$(".table-body").after("<tr style=\"background-color:#2ecc71\" class=\""+materialname+"\"><td data-label=\"Item\" class=\"invslot-item invslot-item-image\" data-minetip-title=\"\&f"+materialname+"\">"+materialname + " <img src=\"images\\arrow.png\"></img> " + enchantmaterial +"</td><td data-label=\"Prix Multiplié (enchant)\">" + normalEnchantPrice + " (x"+multiplier+")</td><td data-label=\"Prix x1 (enchant)\">"+sellPrice+"</td></td><td data-label=\"Recette net\">"+benef+" coins/i</td><td data-label=\"Pourcentage\">"+percent+"%</td></tr>")
		}
}
