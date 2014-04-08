var knockoutLessons = [
	{
		name: 'Editable Item List test'
	},
	{
		name: 'Single Page Application With Ajax/CRUD'
	}
];

exports.list = function(req, res){
	res.render(
		'index',
		{
			title: 'Knockout Lessons',
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