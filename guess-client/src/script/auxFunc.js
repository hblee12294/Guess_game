export const scrollBottom = () => {
	const scroll = document.querySelector('.records');
	scroll.scrollTop = scroll.scrollHeight;
}

// export const closePopup = () => {
// 	document.querySelector('.error-popup').calssList.remove('popup-change');
// }

export const reloadPage = () => {
	window.location.reload();
}