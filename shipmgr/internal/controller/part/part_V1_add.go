package part

import (
	"context"
	"shipmgr/internal/model"

	"shipmgr/api/part/V1"
	"shipmgr/internal/service"
)

func (c *ControllerV1) Add(ctx context.Context, req *V1.AddReq) (res *V1.AddRes, err error) {
	inp := model.PartInput{
		Name:     req.Name,
		Script:   req.Script,
		IsSingle: req.Single,
	}
	errr := service.Shipmanage().AddPart(ctx, inp)

	res = &V1.AddRes{
		Status: errr == nil,
	}
	return res, errr
}
