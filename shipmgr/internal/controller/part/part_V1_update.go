package part

import (
	"context"
	"shipmgr/internal/service"

	"shipmgr/api/part/V1"
)

func (c *ControllerV1) Update(ctx context.Context, req *V1.UpdateReq) (res *V1.UpdateRes, err error) {
	err = service.Shipmanage().UpdatePart(ctx, *req)
	return &V1.UpdateRes{Status: 1}, err
}
