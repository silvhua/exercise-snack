// import './DownloadCsv.scss';
import Button from '../Button/Button';
import { getReadableTimestamp } from '@/app/_libs/dataProcessing';

const DownloadCsv = ({ data, fileName, appendTimestamp }) => {
  if (appendTimestamp) {
    fileName = `${fileName}_${getReadableTimestamp(true)}`;
  }

  const convertToCSV = (objArray, addHeader) => {
    let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    array = array.map(object => {
      const simplifiedObject = {
        "movement category": object.movement,
        exercise: object.name,
        id: object.id
      }
      return simplifiedObject
    })
    let str = '';

    if (addHeader) {
      const headerObject = {}
      Object.keys(array[0]).forEach(key => {
        headerObject[key] = key;
      });

      objArray = array.unshift(headerObject);
    }

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';

        const value = array[i][index];
        if (typeof value === 'string' && value.includes(',')) {
          line += `"${value}"`;
        } else {
          line += value;
        }
      }
      str += line + '\r\n';
    }
    return str;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data, true)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buttonProps = {
    text: 'Export to CSV',
    onClick: downloadCSV
  }

  return (
    <Button
      buttonProps={buttonProps}
    />
  );
}

export default DownloadCsv;

