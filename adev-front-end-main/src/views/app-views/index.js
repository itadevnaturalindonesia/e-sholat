import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import PrivateRoute from 'components/custom-components/PrivateRoute'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <PrivateRoute path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-karyawan`} component={lazy(() => import(`./detail-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-report`} component={lazy(() => import(`./detail-report`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-report-all`} component={lazy(() => import(`./detail-report-all`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-analisa-karyawan`} component={lazy(() => import(`./detail-analisa-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-calendar`} component={lazy(() => import(`./detail-calendar`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/karyawan-aktif`} component={lazy(() => import(`./karyawan-aktif`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/daftar-karyawan`} component={lazy(() => import(`./daftar-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/tambah-item`} component={lazy(() => import(`./tambah-item`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/karyawan-off`} component={lazy(() => import(`./karyawan-off`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/calendar`} component={lazy(() => import(`./calendar`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/settings`} component={lazy(() => import(`./settings`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/search-new-report`} component={lazy(() => import(`./analisa-report/searching-tools`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/search-new-report-mingguan`} component={lazy(() => import(`./analisa-report-mingguan/searching-tools`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/search-new-report-bulanan`} component={lazy(() => import(`./analisa-report-bulanan/searching-tools`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/search-new-report-tahunan`} component={lazy(() => import(`./analisa-report-tahunan/searching-tools`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/bad-employee`} component={lazy(() => import(`./bad-employee`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/cari-bad-employee`} component={lazy(() => import(`./cari-bad-employee`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/download-bad-employee`} component={lazy(() => import(`./download-bad-employee`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/bad-employee/bad_excel`} component={lazy(() => import(`./bad-employee/BadExcel`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/print-bad-employee`} component={lazy(() => import(`./print-bad-employee`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/print-bad-by-tanggal`} component={lazy(() => import(`./print-bad-by-tanggal`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-kelompok`} component={lazy(() => import(`./detail-kelompok`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/detail-sholat-harian`} component={lazy(() => import(`./detail-sholat-harian`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/edit-sholat-harian`} component={lazy(() => import(`./edit-sholat-harian`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/analisa-report`} component={lazy(() => import(`./analisa-report`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/analisa-karyawan`} component={lazy(() => import(`./analisa-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/cari-analisa-karyawan`} component={lazy(() => import(`./cari-analisa-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/download-analisa-karyawan`} component={lazy(() => import(`./download-analisa-karyawan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/daftar-admin`} component={lazy(() => import(`./daftar-admin`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/shift-karyawan`} component={lazy(() => import(`./shift`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/account`} component={lazy(() => import(`./account`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/report`} component={lazy(() => import(`./report`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/result-analisa`} component={lazy(() => import(`./analisa-report/result-analisa`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/analisa-report-bulanan`} component={lazy(() => import(`./analisa-report-bulanan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/analisa-report-mingguan`} component={lazy(() => import(`./analisa-report-mingguan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/analisa-report-tahunan`} component={lazy(() => import(`./analisa-report-tahunan`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/result-analisa-report-bulanan`} component={lazy(() => import(`./analisa-report-bulanan/result-analisa`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/result-analisa-report-mingguan`} component={lazy(() => import(`./analisa-report-mingguan/result-analisa`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/result-analisa-report-tahunan`} component={lazy(() => import(`./analisa-report-tahunan/result-analisa`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/barcode`} component={lazy(() => import(`./barcode`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/config-weekend`} component={lazy(() => import(`./config-weekend`))} />
        <PrivateRoute path={`${APP_PREFIX_PATH}/add-config-weekend`} component={lazy(() => import(`./add-config-weekend`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboard`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
