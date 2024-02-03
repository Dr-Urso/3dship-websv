package part

import (
	"context"

	"github.com/gogf/gf/v2/errors/gcode"
	"github.com/gogf/gf/v2/errors/gerror"

	"shipmgr/api/part/V1"
)

func (c *ControllerV1) AddGroup(ctx context.Context, req *V1.AddGroupReq) (res *V1.AddGroupRes, err error) {
	return nil, gerror.NewCode(gcode.CodeNotImplemented)
}
