
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// let api_url = "http://localhost:8000";
let api_url = "https://blogs-160e.onrender.com";

export default api_url;


export function convertDateFormat(dateString) {
    let date = new Date(dateString);

    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    return `${day}/${month}/${year}`;
}

export function convertDateTimeFormat(dateString) {
    let date = new Date(dateString);
    return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()} ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`;
};

export function emailValidation(email) {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
        return true
    }
    return false;
};

export const exportPdf = (blogs,filename)=>{
    const doc = new jsPDF()

    autoTable(doc, { html: '#my-table' })

    const tableHeading = [Object.keys(blogs[0])];

    const tableData = blogs.map(item => Object.values(item));

    autoTable(doc, {
      head: tableHeading,
      body: tableData
    })

    doc.save(filename+'.pdf')
}


