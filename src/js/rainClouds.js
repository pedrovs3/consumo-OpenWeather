const clouds = ['https://imagensemoldes.com.br/wp-content/uploads/2020/04/Foto-de-Nuvem-PNG.png', 'https://2.bp.blogspot.com/--VaTpzBo3CI/WMVYWk9DapI/AAAAAAABiB8/XcPIa8Rwb9Y5LYNRiOTzfTRGqRwYJJnnQCEw/s1600/cloud-normal2.png', 'https://i.pinimg.com/originals/f5/a9/3f/f5a93ff14ce02da16a79658f4713e7e6.png']

export const createClouds = () => {
    const container = document.querySelector('.clouds-container');

    const cloud = document.createElement('img');
    cloud.src = clouds[Math.floor(Math.random() * clouds.length)];
    cloud.classList.add('rain-cloud');
    cloud.style.top = Math.floor(Math.random() * 60) + 'vh';
    cloud.style.left = Math.floor(Math.random() * 100) + 'vw';
    cloud.style.width = Math.floor(Math.random() * 50) + '%';

    if (cloud.style.width < 30)
        cloud.style.width = '30%';

    container.appendChild(cloud);
}