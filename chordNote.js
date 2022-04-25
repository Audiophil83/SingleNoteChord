inlets = 2;
outlets = 3;

scales = 
[
    {
        "steps": [0,2,4,5,7,9,11],
        "name": "Ionian",
        "id": 0
    },
    {
        "steps": [0,2,3,5,7,9,10],
        "name": "Dorian",
        "id": 1
    },
    {
        "steps": [0,1,3,5,7,8,10],
        "name": "Phrygian",
        "id": 2
    },
    {
        "steps": [0,2,4,6,7,9,11],
        "name": "Lydian",
        "id": 3
    },
    {
        "steps": [0,2,4,5,7,9,10],
        "name": "Mixolydian",
        "id": 4
    },
    {
        "steps": [0,2,3,5,7,8,10],
        "name": "Aeolian",
        "id": 5
    },
    {
        "steps": [0,1,3,5,6,8,10],
        "name": "Locrian",
        "id": 6
    },
    {
        "steps": [0,2,3,5,7,9,11],
        "name": "Ascending Melodic minor",
        "id": 7
    },
    {
        "steps": [0,1,3,5,7,9,10],
        "name": "Phrygian ♮6, Dorian ♭2, Assyrian, or Phrygidorian",
        "id": 8
    },
    {
        "steps": [0,2,4,6,8,9,11],
        "name": "Lydian augmented or Lydian ♯5",
        "id": 9
    },
    {
        "steps": [0,2,4,6,7,9,10],
        "name": "Lydian dominant, Lydian ♭7, Acoustic scale, Mixolydian ♯4, Overtone, or Lydomyxian",
        "id": 10
    },
    {
        "steps": [0,2,4,5,7,8,10],
        "name": "Mixolydian ♭6, Melodic major, fifth mode of Melodic minor, Hindu, or Myxaeolian",
        "id": 11
    },
    {
        "steps": [0,2,3,5,6,8,10],
        "name": "Locrian ♮2, Half-diminished, or Aeolocrian",
        "id": 12
    },
    {
        "steps": [0,1,3,4,6,8,10],
        "name": "Super Locrian, Altered dominant scale, or altered scale",
        "id": 13
    },
    {
        "steps": [0,2,3,5,7,8,11],
        "name": "Harmonic minor",
        "id": 14
    },
    {
        "steps": [0,1,3,5,6,9,10],
        "name": "Locrian #6",
        "id": 15
    },
    {
        "steps": [0,2,4,5,8,9,11],
        "name": "Ionian #5",
        "id": 16
    },
    {
        "steps": [0,2,3,6,7,9,10],
        "name": "Dorian #4",
        "id": 17
    },
    {
        "steps": [0,1,4,5,7,8,10],
        "name": "Phrygian Major",
        "id": 18
    },
    {
        "steps": [0,3,4,6,7,9,11],
        "name": "Lydian #2",
        "id": 19
    },
    {
        "steps": [0,1,3,4,6,8,9],
        "name": "Altered Dominant bb7",
        "id": 20
    },
    {
        "steps": [0,2,4,5,7,9,10,11],
        "name": "Dominant Bebop",
        "id": 21
    },
    {
        "steps": [0,2,4,5,7,8,9,11],
        "name": "Major Bebop",
        "id": 22
    },
    {
        "steps": [0,1,3,4,6,7,9,10],
        "name": "Diminished",
        "id": 23
    },
    {
        "steps": [0,2,4,6,8,10],
        "name": "Whole Tone",
        "id": 24
    }
];



scaleRoot = 0;

enabled = false;
root = 0;
interval = 0;
scaleId = 0;
root = 0;
pitchRange = 1;

function anything(a) {

	enabled = arguments[0] == 1;
	note = arguments[1];
	interval = arguments[2];
	scaleId = arguments[3];
	root = arguments[4] % 12;
	pitchRange = arguments[5];

	var scaleSteps = getScaleSteps(scaleId);
	
	var stepIndex = scaleSteps.indexOf((note - root) % 12);
	//post("stepIndex: " + stepIndex);
	
	if (interval > 0 && stepIndex != -1) {
		
		scaleRoot = (note - root) - scaleSteps[stepIndex];

		var out = root + scaleRoot + getNote(scaleSteps, stepIndex);
		//post("out: " + out);
		
		var pitch1 = root + scaleRoot + getNote(scaleSteps, stepIndex + pitchRange);
		
		var pitch2 = root + scaleRoot + getNote(scaleSteps, stepIndex - pitchRange);
		
		outlet(0, out);
		outlet(1, pitch1);
		outlet(2, pitch2);		
	}
}

function getScaleSteps(scaleId) {
	var scale = scales.filter(function(s) {
  		return s.id == scaleId;
	})[0];
	
	if (scale == null) {
		return [];
	} 
	
	var scaleSteps = scale.steps;
	
	return scaleSteps;
}

function getNote(scaleSteps, stepIndex) {
	var index = (stepIndex + interval - 1) % scaleSteps.length;
	//post("index: " + index);
		
	var carryover = 12 * Math.floor((stepIndex + interval - 1) / scaleSteps.length);
	//post("carryover : " + carryover); 
		
	return scaleSteps[index] + carryover;		
}