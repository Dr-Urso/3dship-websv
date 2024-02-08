package part

import (
	"context"
	"shipmgr/internal/service"

	"shipmgr/api/part/V1"
)

func (c *ControllerV1) Filter(ctx context.Context, req *V1.FilterReq) (res *V1.FilterRes, err error) {
	res, err = service.Shipmanage().ExportFiltered(ctx, *req)
	return
}
