import { useState } from 'react';
import { utils, write, writeFile } from 'xlsx';

import { Button } from 'react-bootstrap';

import Heading from '../components/Heading';
import ReportForm from '../components/ReportForm';
import DataTable from '../components/DataTable';

import BoardDataService from '../services/board';

const Reports = () => {
  const initialValues = { state: '', staffId: '', locationId: '', regDateFrom: '', regDateTo: '' };

  const [report, setReport] = useState(null);
  const [sumbitted, setSubmitted] = useState(false);

  const startReport = () => {
    setReport(null);
    setSubmitted(false);
  };

  const getReport = (values) => {
    console.log(values);
    BoardDataService.findByParams(values)
      .then((response) => {
        setReport(response.data);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(console.log);
  };

  const exportReport = (type) => {
    const sheet = utils.json_to_sheet(report);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, sheet, 'Sheet1');
    write(workbook, { bookType: type, bookSST: true, type: 'base64' });
    writeFile(workbook, `Отчет-${new Date().toISOString().slice(0, 16)}.${type}`);
  };

  const tableHeadings = {
    inventoryNumber: 'Инвентарный номер',
    manufacturer: 'Производитель',
    model: 'Модель',
    diagSize: 'Диагональ (дюймы)',
    registrationDate: 'Дата регистрации',
    usageStartDate: 'Дата начала эксплуатации',
    deprecationPeriod: 'Период амортизации (месяцев)',
    repairStartDate: 'Дата начала ремонта',
    failureReason: 'Причина поломки',
    state: 'Состояние',
    technology: 'Технология',
    location: 'Место нахождения',
    staff: 'Ответственный сотрудник',
  };

  return (
    <>
      <Heading>Отчет</Heading>

      {!sumbitted ? (
        <ReportForm initialValues={initialValues} onSubmit={getReport} />
      ) : (
        <>
          <div className="d-flex gap-4 justify-content-between mb-3">
            <Button variant="outline-success" onClick={() => startReport()}>
              Новый отчет
            </Button>
            <Button variant="success" onClick={() => exportReport('xls')}>
              Экспорт в .xls
            </Button>
          </div>
          <DataTable
            rows={{ data: report, idProp: 'inventoryNumber' }}
            tableHeadings={tableHeadings}
            showEditBtn={false}
          />
        </>
      )}
    </>
  );
};

export default Reports;
