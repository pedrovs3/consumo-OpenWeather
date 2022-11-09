export const changeBackground = () => {
    const body = document.querySelector('body');
    let date = new Date();
    let currentTime = date.getHours();

    if (currentTime > 4 && currentTime < 20)
			body.id = 'day';
		else
			body.id = 'night';
}