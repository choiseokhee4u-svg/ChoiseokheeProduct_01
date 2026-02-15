const { Solar } = require('lunar-javascript');

try {
    const solar = Solar.fromYmdHms(2025, 2, 8, 12, 0, 0);
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();
    
    const yearGan = baZi.getYearGan();
    console.log("YearGan:", yearGan);
    console.log("Type:", typeof yearGan);
    
    if (yearGan.getName) {
        console.log("getName():", yearGan.getName());
    } else {
        console.log("getName() does not exist");
    }
    
} catch (e) {
    console.error(e);
}
