import {
    isChartValidationError,
    isDashboardValidationError,
    isTableValidationError,
    ValidationErrorChartResponse,
    ValidationErrorDashboardResponse,
    ValidationResponse,
} from '@lightdash/common';
import {
    Anchor,
    Flex,
    Stack,
    Table,
    Text,
    useMantineTheme,
} from '@mantine/core';
import { IconLayoutDashboard, IconTable } from '@tabler/icons-react';
import { createRef, FC, RefObject, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTableStyles } from '../../../hooks/styles/useTableStyles';
import { getChartIcon, IconBox } from '../../common/ResourceIcon';
import { ErrorMessage } from './ErrorMessage';
import { useScrollAndHighlight } from './hooks/useScrollAndHighlight';

const getLinkToResource = (
    validationError: ValidationResponse,
    projectUuid: string,
) => {
    if (isChartValidationError(validationError))
        return `/projects/${projectUuid}/saved/${validationError.chartUuid}`;

    if (isDashboardValidationError(validationError))
        return `/projects/${projectUuid}/dashboards/${validationError.dashboardUuid}/view`;

    if (isTableValidationError(validationError))
        return `/projects/${projectUuid}/tables`;
};

const Icon = ({ validationError }: { validationError: ValidationResponse }) => {
    if (isChartValidationError(validationError))
        return getChartIcon(validationError.chartType);
    if (isDashboardValidationError(validationError))
        return <IconBox icon={IconLayoutDashboard} color="green.8" />;
    return <IconBox icon={IconTable} color="indigo.6" />;
};

export const ValidatorTable: FC<{
    data: ValidationResponse[];
    projectUuid: string;
}> = ({ data, projectUuid }) => {
    const { cx, classes } = useTableStyles();
    const { colors } = useMantineTheme();

    const location = useLocation<{ validationId: number }>();
    const searchParams = new URLSearchParams(location.search);
    const validationId = searchParams.get('validationId');

    const refs = useMemo(
        () =>
            data.reduce((acc, value) => {
                acc[value.validationId.toString()] = createRef();
                return acc;
            }, {} as { [key: string]: RefObject<HTMLTableRowElement> }),
        [data],
    );

    useScrollAndHighlight(refs, validationId, colors);

    const handleOnValidationErrorClick = (
        validationError: ValidationResponse,
    ) => {
        const link = getLinkToResource(validationError, projectUuid);
        if (link) window.open(link, '_blank');
    };

    const getViews = (
        validationError:
            | ValidationErrorChartResponse
            | ValidationErrorDashboardResponse,
    ) => {
        if ('chartViews' in validationError) return validationError.chartViews;
        if ('dashboardViews' in validationError)
            return validationError.dashboardViews;
    };

    const getErrorName = (validationError: ValidationResponse) => {
        if (
            isChartValidationError(validationError) ||
            isDashboardValidationError(validationError)
        )
            return validationError.name;
        if (isTableValidationError(validationError))
            return validationError.name ?? 'Table';
    };

    return (
        <Table
            className={cx(
                classes.root,
                classes.smallPadding,
                classes.stickyHeader,
            )}
            fontSize="xs"
            highlightOnHover
        >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Error</th>
                </tr>
            </thead>
            <tbody>
                {data && data.length
                    ? data.map((validationError) => (
                          <tr
                              key={validationError.validationId}
                              ref={refs[validationError.validationId]}
                              onClick={() =>
                                  handleOnValidationErrorClick(validationError)
                              }
                          >
                              <td width="50%">
                                  <Anchor
                                      sx={{
                                          color: 'unset',
                                          ':hover': {
                                              color: 'unset',
                                              textDecoration: 'none',
                                          },
                                      }}
                                      href={getLinkToResource(
                                          validationError,
                                          projectUuid,
                                      )}
                                      target="_blank"
                                  >
                                      <Flex gap="sm" align="center">
                                          <Icon
                                              validationError={validationError}
                                          />

                                          <Stack spacing={4}>
                                              <Text fw={600}>
                                                  {getErrorName(
                                                      validationError,
                                                  )}
                                              </Text>

                                              {(isChartValidationError(
                                                  validationError,
                                              ) ||
                                                  isDashboardValidationError(
                                                      validationError,
                                                  )) && (
                                                  <Text fz={11} color="gray.6">
                                                      {getViews(
                                                          validationError,
                                                      )}{' '}
                                                      view
                                                      {getViews(
                                                          validationError,
                                                      ) === 1
                                                          ? ''
                                                          : 's'}
                                                      {' • '}
                                                      {validationError.lastUpdatedBy ? (
                                                          <>
                                                              Last edited by{' '}
                                                              <Text
                                                                  span
                                                                  fw={500}
                                                              >
                                                                  {
                                                                      validationError.lastUpdatedBy
                                                                  }
                                                              </Text>
                                                          </>
                                                      ) : null}
                                                  </Text>
                                              )}
                                          </Stack>
                                      </Flex>
                                  </Anchor>
                              </td>
                              <td width="50%">
                                  <ErrorMessage
                                      validationError={validationError}
                                  />
                              </td>
                          </tr>
                      ))
                    : null}
            </tbody>
        </Table>
    );
};
