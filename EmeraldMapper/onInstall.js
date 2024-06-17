let emerald = client.emerald
var mapper = emerald.mapper = {
  name:'EmeraldMapper',
  version:'0.0.1',
  map: {}
};

if (get_variable('emerald_mapper_roomweights') !== null) {
  mapper.roomWeights = JSON.parse(get_variable('emerald_mapper_roomweights')) 
} else {
  mapper.roomWeights = {
    931: 999, //prime seren
    1337: 999, //prime glom
    4136: 999, //prime mag
    4555: 999, //celestia
    4607: 999, //nil
    4710: 999, //etherseren
    4847: 999, //etherglom,
    4865: 999, //earth
    11152: 999, //prime halli
    11401: 999, //prime gaudi
    19519: 999, //continuum
    19526: 999, //vortex
    19663: 999, //fire
    19765: 999 //air
  }
}

mapper.getArea = (vnum) => {
  return mapper.areas[mapper.rooms[vnum].area];
}

mapper.getRoom = (roomName) => {
  //let rooms = mapper.mapxml.querySelectorAll("room");
  let rooms = mapper.rooms;
  emerald.note.clear();
  emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
  emerald.note.build(`Scanning ${Object.keys(rooms).length} rooms for "`,emerald.configs.ui_white,'');
  emerald.note.build(roomName, emerald.configs.ui_green, '', '"...',emerald.configs.ui_white,'');
  emerald.note.display();
  let foundRooms = 0;
  rooms.forEach(r => {
    if (r.title.includes(roomName.toLowerCase())) {
      let area = mapper.findArea(r.id);
      emerald.note.clear();
      emerald.note.build('[Mapper]:','silver','seagreen',' ','silver','');
      emerald.note.build(`«pathgo ${r.id}»v${r.id}`,emerald.configs.ui_green,'',': ',emerald.configs.ui_white,'');
      emerald.note.build(r.title,emerald.configs.ui_white,'');
      emerald.note.build(' [',emerald.configs.ui_blue,'', area,emerald.configs.ui_green,'',']',emerald.configs.ui_blue,'');
      emerald.note.display();
      foundRooms++;
    }
  });
  if (foundRooms == 0) {
    emerald.emnote('ROOM NOT FOUND!','Mapper');
    emerald.note.clear();
  } else {
    emerald.emnote(`Found ${foundRooms} matching rooms.`,'Mapper');
  }
}

mapper.saveRoomWeights = () => {
  set_variable('emerald_mapper_roomweights',JSON.stringify(mapper.roomWeights));
}

mapper.setRoomWeight = (vnum, value) => {
  mapper.roomWeights[vnum] = value;
  mapper.saveRoomWeights();
}

mapper.getPath = (origin, dest) => {
  let r = mapper.mapxml.querySelector(`room#${origin}`)
}

emerald.plugins['mapper'] = true;
mapper.saveRoomWeights();
run_function('loadMap','','EmeraldMapper');
client.emerald.emnote(`${mapper.name} v${mapper.version} initialised.`);