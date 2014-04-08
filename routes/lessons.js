var knockoutLessons = [
	{
		name: 'Editable Item List test'
	}
];

exports.list = function(req, res){
	res.render(
		'index',
		{
			lessonList: knockoutLessons
		}
	);
};
exports.display = function(req, res, next){
	var lessonIndex = parseInt(req.params[0]),
		lesson = knockoutLessons[lessonIndex];
		console.log(lessonIndex, lesson);
	if(lesson){
		res.render(
			'lesson_' + lessonIndex,
			lesson
		);
	} else {
		next();
	}
};