package part

import (
	"context"
	"shipmgr/internal/model"
	"shipmgr/internal/service"

	"shipmgr/api/part/V1"
)

func (c *ControllerV1) AddGroup(ctx context.Context, req *V1.AddGroupReq) (res *V1.AddGroupRes, err error) {
	inp := model.GroupInput{
		Name:      req.Name,
		StartWith: req.StartWith,
	}
	err = service.Shipmanage().AddGroup(ctx, inp)
	return &V1.AddGroupRes{
		Status: err == nil,
	}, err
}
