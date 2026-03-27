Lyte.Component.register("data-view-kanban", {
	data : function(){
		return {
			ltPropBoardDetails : Lyte.attr("array", { default : [] })
		}
	},
	init : function() {
		this._normalizeBoards();
	},
	_normalizeBoards : function() {
		var boards = this.getData('ltPropBoardDetails');
		if (!Array.isArray(boards) || boards.length === 0) return;
		var changed = false;
		boards.forEach(function(board) {
			if (!Array.isArray(board.cards)) return;
			board.cards.forEach(function(card) {
				if (card.cardTitle !== undefined) return; // already processed
				changed = true;
				var keys = Object.keys(card);
				var titleKey = keys.find(function(k) { return /^(full_name|name|title|label|subject|first_name|last_name)/i.test(k); }) || keys[0];
				card.cardTitle = (card[titleKey] != null ? String(card[titleKey]) : '') || '(No Name)';
				card.cardFields = [];
				keys.forEach(function(k) {
					if (k === titleKey) return;
					var v = card[k];
					if (v == null || v === '') return;
					if (typeof v === 'object') v = v.name || v.email || JSON.stringify(v);
					card.cardFields.push({
						label: k.replace(/_/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); }),
						value: String(v)
					});
				});
			});
		});
		if (changed) {
			this.setData('ltPropBoardDetails', boards.slice());
		}
	},
	actions : {},
	methods : {}
});
