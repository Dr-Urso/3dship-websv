package part

import (
	"context"
	"shipmgr/internal/service"

	"shipmgr/api/part/V1"
)

func (c *ControllerV1) Unity(ctx context.Context, req *V1.UnityReq) (res *V1.UnityRes, err error) {

	x, err := service.Shipmanage().ExportUnity(ctx)
	res = &V1.UnityRes{Data: *x, Status: true}

	return
}
